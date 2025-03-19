import ezdxf
import matplotlib.pyplot as plt
import cv2
from heapq import heappush, heappop
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend

def dxf_layer_to_png(dxf_path, layer_name, out_path):
    doc = ezdxf.readfile(dxf_path) #read the file
    msp = doc.modelspace() # get modelsapce
    
    layer_entities = [e for e in msp if e.dxf.layer.lower() == layer_name.lower()] # creates entities for everything in the model space (of that specific layer)
    
    # Set all entities to black
    for entity in layer_entities:
        entity.dxf.color = 5  # black
    
    # Create figure and render
    fig, ax = plt.subplots(figsize=(40, 30)) #displays a canvas and a set of axises
    ctx = RenderContext(doc) 
    out = MatplotlibBackend(ax) # interfaces ezd
    frontend = Frontend(ctx, out)
    
    # Draw and save
    frontend.draw_entities(layer_entities)
    ax.autoscale() # scales as necessary
    ax.set_aspect("equal") #equal scaling for both axes
    plt.axis("off") # Hides axis lines 
    plt.savefig(out_path, dpi=300, bbox_inches="tight") #exports as pdf
    plt.close(fig) # closes the figure
    print(f"Generated {out_path} from {dxf_path}") # confirmation

def image_to_nav_grid(image_path, cell_size=10):
    # I couldnt find a way to reliably use ezdxf and the actual line info to create a mesh, so i decided to do the scuffed thing and use opencv over the generated picutre (this is positively cooked)
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    if img is None:
        raise FileNotFoundError(f"Could not read image at {image_path}") # couldn't find image
    
    h, w = img.shape # define height and width, taken from image

    grid = cv2.resize(img, (w//cell_size, h//cell_size), interpolation=cv2.INTER_AREA) 
    _, grid = cv2.threshold(grid, 200, 1, cv2.THRESH_BINARY_INV) # _ represented 200, throwaaya
    return grid, (h, w)

def a_star(grid, start, goal): # Not doing allat
    neighbors = [(dx, dy) for dx in (-1,0,1) for dy in (-1,0,1) if not (dx == dy == 0)]
    open_heap = []
    heappush(open_heap, (0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    
    while open_heap:
        current = heappop(open_heap)[1]
        
        if current == goal:
            return reconstruct_path(came_from, current)
            
        for dx, dy in neighbors:
            neighbor = (current[0]+dx, current[1]+dy)
            
            if not (0 <= neighbor[0] < grid.shape[0] and 
                    0 <= neighbor[1] < grid.shape[1]):
                continue
                
            if grid[neighbor[0], neighbor[1]] != 0:
                continue
                
            tentative_g = g_score[current] + ((dx**2 + dy**2)**0.5)
            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + heuristic(neighbor, goal)
                heappush(open_heap, (f_score[neighbor], neighbor))
    
    return None

def heuristic(a, b):
    return ((a[0]-b[0])**2 + (a[1]-b[1])**2)**0.5

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    return path[::-1]

def interactive_navigation(image_path, cell_size=10):
    try:
        grid, orig_size = image_to_nav_grid(image_path, cell_size)
    except FileNotFoundError as e:
        print(e)
        return
    
    # Setup visualization
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10)) # creates 2 figures on the output
    img = cv2.imread(image_path)
    ax1.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)) # show image
    ax1.set_title("click points") 
    ax2.imshow(grid, cmap='gray', origin='lower') # show the mesh visualization
    
    clicks = []

    # creates coords based on where you click
    def on_click(event):
        if event.inaxes == ax1:
            # Convert image coordinates to grid coordinates
            grid_x = int(event.xdata / orig_size[1] * grid.shape[1])
            grid_y = int(event.ydata / orig_size[0] * grid.shape[0])
            
            # Store click and plot
            clicks.append((grid_y, grid_x)) # append to coords
            color = 'ro' if len(clicks) == 1 else 'go' #makes a red/green circle
            ax1.plot(event.xdata, event.ydata, color, markersize=3) #add to first plot
            ax2.plot(grid_x, grid_y, color, markersize=3) #add to second plot
            plt.draw() # display
            
            # Find path when two points are selected
            if len(clicks) % 2 == 0: # Do this for every 2 points in clicks
                start, goal = clicks # set start and goal
                path = a_star(grid, start, goal) # run a* algo over that
                
                if path:
                    # Convert path back to image coordinates
                    path_pixels = [(p[1]*cell_size + cell_size/2, p[0]*cell_size + cell_size/2) for p in path] 

                    ax1.plot(*zip(*path_pixels), 'b-', linewidth=2)
                    plt.draw()
                else:
                    print("No valid path found!")
                
                clicks.clear() #remove clicks
    
    fig.canvas.mpl_connect('button_press_event', on_click) # set listener on mpl canvas
    plt.show() # show new plot

if __name__ == "__main__":
    dxf_path = "FNB1.dxf"
    output_image = "walls.png"
    layer_name = "walls"
    cell_size = 5
    
    # call dxf_to_png to draw the image
    dxf_layer_to_png(dxf_path, layer_name, output_image)
    
    # Path Planner
    interactive_navigation(output_image, cell_size)