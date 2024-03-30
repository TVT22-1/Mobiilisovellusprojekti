import { Dimensions } from "react-native";

export default Constants = {
    MAX_WIDTH: Dimensions.get("screen").width, 
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 11,  // number of cells in the grid
    CELL_SIZE: 31, // size of each cell

}