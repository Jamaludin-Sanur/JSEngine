ListCommand = {
    CLEANING_ROBOT: "CLEANING_ROBOT",
    RESET: "RESET"
}

ListEntities = {
    "s": "Junk",
    "c": "Wall",
    null: "Wall",
    "terrain": "Terrain",
    "standardrobot": "StandardRobot",
    "myqrobot": "MyQRobot"
}



ListAction = {
    "A": "MYQ_ROBOT_MOVE_FORWARD",
    "B": "MYQ_ROBOT_MOVE_BACKWARD",
    "TL": "MYQ_ROBOT_ROTATE_LEFT",
    "TR": "MYQ_ROBOT_ROTATE_RIGHT",
    "C": "MYQ_ROBOT_CLEANING",
}

ListDirection = {
    "n": { x: 0, y: 0, z: 90 },
    "e": { x: 0, y: 0, z: 180 },
    "s": { x: 0, y: 0, z: 270 },
    "w": { x: 0, y: 0, z: 0 },
}

module.exports = {
    ListCommand, ListEntities, ListAction, ListDirection
}