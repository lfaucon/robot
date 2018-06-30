from bisect import bisect
from collections import namedtuple, deque

Vector = namedtuple("Vector", "x,y")
DIR = namedtuple("Vector", "LEFT,RIGHT,UP,DOWN")(0, 1, 2, 3)


class Game:
    def __init__(self, size: int, walls, target, target_robot_id: int):
        self.size = size
        self.walls = list(walls)
        self.target = target
        self.target_robot_id = target_robot_id
        self.map = [
            [[val]*size for _ in range(size)]
            for val in [0, size-1, size-1, 0]
        ]
        for wall in walls:
            for i in range(wall.x+1, size):
                self.map[DIR.LEFT][i][wall.y] = max(
                    self.map[DIR.LEFT][i][wall.y], wall.x+1)
            for i in range(0, wall.x):
                self.map[DIR.RIGHT][i][wall.y] = min(
                    self.map[DIR.RIGHT][i][wall.y], wall.x-1)

            for i in range(0, wall.y):
                self.map[DIR.UP][wall.x][i] = min(
                    self.map[DIR.UP][wall.x][i], wall.y-1)
            for i in range(wall.y+1, size):
                self.map[DIR.DOWN][wall.x][i] = max(
                    self.map[DIR.DOWN][wall.x][i], wall.y+1)

    def move(self, robots, robot_id, direction):
        robot = robots[robot_id]

        new_robot = None
        b = self.map[direction][robot.x][robot.y]

        # check if we collide with a robot
        def filter_fun(robot_other):
            return {
                DIR.LEFT: (robot_other.y == robot.y) and (b <= robot_other.x and robot_other.x <= robot.x),
                DIR.RIGHT: (robot_other.y == robot.y) and (robot_other.x <= b and robot.x <= robot_other.x),
                DIR.UP: (robot_other.x == robot.x) and (robot.y <= robot_other.y and robot_other.y <= b),
                DIR.DOWN: (robot_other.x == robot.x) and (
                    b <= robot_other.y and robot_other.y <= robot.y)
            }[direction]

        robot_set = [r for i, r in enumerate(
            robots) if i != robot_id and filter_fun(r)]

        if len(robot_set) > 0:
            vals = {
                DIR.LEFT: Vector(max(r.x for r in robot_set)+1, robot.y),
                DIR.RIGHT: Vector(min(r.x for r in robot_set)-1, robot.y),
                DIR.UP: Vector(robot.x, min(r.y for r in robot_set)-1),
                DIR.DOWN: Vector(robot.x, max(r.y for r in robot_set)+1),
            }
            new_robot = vals[direction]
        else:
            if direction == DIR.LEFT or direction == DIR.RIGHT:
                new_robot = Vector(b, robot.y)
            if direction == DIR.UP or direction == DIR.DOWN:
                new_robot = Vector(robot.x, b)

        return robots[:robot_id]+(new_robot,)+robots[robot_id+1:]

    def isWon(self, robots):
        return robots[self.target_robot_id] == self.target


def getPath(positions, final_state):
    path = []
    prev_state = final_state
    while prev_state:
        state = prev_state
        prev_state = positions[state]
        path.append(state)
    path.reverse()
    return path


def search(game, robots_initial_state):
    positions = {robots_initial_state: None}
    q = deque()
    q.append((0, robots_initial_state))
    prev_depth = 0
    while len(q) > 0:
        depth, robot_state = q.popleft()
        if depth > prev_depth:
            print('DEPTH', depth)
            print('LEN(Q)', len(q))
            prev_depth = depth
        if depth > 30:
            print("Didn't find any solution")
            return
        for robot_id, r in enumerate(robot_state):
            for direction in DIR:
                new_robot_state = game.move(robot_state, robot_id, direction)
                if new_robot_state in positions:
                    continue
                positions[new_robot_state] = robot_state
                q.append((depth+1, new_robot_state))
                if game.isWon(new_robot_state):
                    return getPath(positions, new_robot_state)


def main():
    game = Game(8, [], Vector(4, 4), 0)
    robots = (Vector(0, 7), Vector(7, 7), Vector(7, 0), Vector(0, 0))
    result = search(game, robots)
    if result:
        for state in result:
            print(state)


main()
