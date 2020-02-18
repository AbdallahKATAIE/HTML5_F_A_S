<template>
    <div id="board">
        <Stats :remainingTime="remainingTime" :remainingCells="remainingCells"></Stats>
        <div>
            <div v-for="y in currentMode.nbCellsY" :key="y" class="cells-row">
                <CellBoard @click.native="onCellClick(x-1, y-1, $event)" v-for="x in currentMode.nbCellsX" :key="x*y"></CellBoard>
            </div>
        </div>
        <Alert v-if="gameLost" :type="'error'" @onCloseModal="onRetry">Hum hum ! Désolé, c'est perdu...<br />
            <button class="retry" @click="onRetry">Recommencer</button>
        </Alert>
        <Alert v-if="gameWon" :type="'success'" @onCloseModal="onRetry">GG ! Sacrée performance...<br />
            <button class="retry" @click="onRetry">Recommencer</button>
        </Alert>
    </div>
</template>

<script>
    import Alert from "@components/Alert.vue";
    import CellBoard from "@components/CellBoard.vue";
    import Stats from "@components/Stats.vue";
    export default {
        components: { CellBoard, Alert, Stats },
        name: "Board",
        props: {
            username: String,
            mode: Number
        },
        data: function() {
            return {
                step: 0,
                modes: [
                    {
                        level: 0,
                        nbCellsX: 6,
                        nbCellsY: 6,
                        nbBombs: 2
                    },
                    {
                        level: 1,
                        nbCellsX: 6,
                        nbCellsY: 6,
                        nbBombs: 4
                    },
                    {
                        level: 2,
                        nbCellsX: 6,
                        nbCellsY: 6,
                        nbBombs: 6
                    }
                ],
                grid: [],
                gameWon: false,
                gameLost: false,
                remainingTime: 120,
                timer: null
            }
        },
        computed: {
            currentMode() {
                return this.modes[this.mode];
            },
            heightCell() {
                return (100/this.currentMode.nbCellsY/2).toString() + "vh";
            },
            widthCell() {
                return (100/this.currentMode.nbCellsX/2).toString() + "vw";
            }, remainingCells() {
                return this.grid.map(row=>{
                    return row.filter(cell=>{
                        return !cell.revealed;
                    }).length;
                }).reduce((accumulator, currentValue)=>{
                    return accumulator + currentValue;
                });
            }
        },
        methods: {
            startChrono() {
                this.timer=setInterval(() => {
                    this.remainingTime--;
                    if(this.remainingTime==0) {
                        window.clearInterval(this.timer);
                        this.gameLost=true;
                    }
                }, 1000);
            },
            onRetry() {
                this.$store.commit("setStep", {
                    step: 1
                });
                this.$store.commit("setMode", {
                    level: 0
                });
            },
            bombClicked() {
            },
            isValidPosition(x, y) {
                return x>=0 && x<this.currentMode.nbCellsX && y>=0 && y<this.currentMode.nbCellsY;
            },
            revealNeighbours(x, y, first=false) {
                let validPosition=this.isValidPosition(x, y);
                if(!validPosition) {
                    console.log("invalid position : ["+x+", "+y+"]");
                    return;
                }
                let cell=this.grid[y][x];
                if(cell.revealed || !cell.safe) {
                    return;
                }
                let count=this.computeUnsafeNeighbours(x, y);
                let nodeCell = this.getNodeCell(x, y);

                cell.revealed=true;
                nodeCell.text(count);
                nodeCell.addClass("safe");

                if(count==0) {
                    this.revealNeighbours(x-1, y-1);
                    this.revealNeighbours(x, y-1);
                    this.revealNeighbours(x+1, y-1);
                    this.revealNeighbours(x-1, y);
                    this.revealNeighbours(x+1, y);
                    this.revealNeighbours(x-1, y+1);
                    this.revealNeighbours(x, y+1);
                    this.revealNeighbours(x+1, y)+1;
                }
            },
            getNodeCell(x, y) {
                let index = y*this.currentMode.nbCellsX + x;
                return $(".cell-board").eq(index);
            },
            computeUnsafeNeighbours(x, y) {
                let count=0;
                if(x>0) {
                    if(!this.grid[y][x-1].safe) {
                        count++;
                    }
                    if(y>0 && !this.grid[y-1][x-1].safe) {
                        count++;
                    }
                    if(y<this.currentMode.nbCellsY-1 && !this.grid[y+1][x-1].safe) {
                        count++;
                    }
                }
                if(x<this.currentMode.nbCellsX-1) {
                    if(!this.grid[y][x+1].safe) {
                        count++;
                    }
                    if(y>0 && !this.grid[y-1][x+1].safe) {
                        count++;
                    }
                    if(y<this.currentMode.nbCellsY-1 && !this.grid[y+1][x+1].safe) {
                        count++;
                    }
                }
                if(y>0 && !this.grid[y-1][x].safe) {
                    count++;
                }
                if(y<this.currentMode.nbCellsY-1 && !this.grid[y+1][x].safe) {
                    count++;
                }
                return count;
            },
            computeGrid() {
                this.grid=[];
                for(let y=0; y<this.currentMode.nbCellsY; y++) {
                    let row = [];
                for(let x=0; x<this.currentMode.nbCellsX; x++) {
                        row.push({
                            safe: true,
                            revealed: false
                        });
                    }
                    this.grid.push(row);
                }
                let bombIndexes = [];
                while(bombIndexes.length<this.currentMode.nbBombs) {
                    let randomIndex;
                    do {
                        randomIndex=Math.floor(Math.random() * Math.floor(this.currentMode.nbCellsX*this.currentMode.nbCellsY - 1));
                    } while(bombIndexes.includes(randomIndex));
                    bombIndexes.push(randomIndex);
                }
                for(const bombIndex of bombIndexes) {
                    let y = (bombIndex==0) ? 0 : Math.trunc(bombIndex/this.currentMode.nbCellsY);
                    let x = (y==0) ? bombIndex : bombIndex - this.currentMode.nbCellsX*y;
                    this.grid[y][x].safe = false;
                }
            }, onCellClick(x, y, event) {
                let cell = this.grid[y][x];
                let target = event.target;
                if(cell.revealed) {
                    return;
                }
                if(cell.safe) {
                    this.revealNeighbours(x, y, true);
                } else {
                    $(target).addClass("bomb");
                    cell.revealed=true;
                    this.gameLost=true;
                }
                if(this.remainingCells==this.currentMode.nbBombs) {
                    this.gameWon=true;
                }
            }
        },
        created: function() {
            this.computeGrid();
            this.startChrono();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #board {
        position: fixed;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        font-family: 'Nunito', sans-serif;
    }
    .cells-row {
        display: flex;
        flex-direction: row;
    }
    button.retry {
        width: calc(70vw + 40px);
        background: transparent;
        border: none;
        background: rgb(155, 192, 255);
        padding: 10px 20px;
        color: white;
        font-size: 30px;
        text-transform: capitalize;
        font-family: 'Nunito', sans-serif;
        transition: all 0.15s ease-in-out;
        cursor: pointer;
        &:hover {
            background: rgb(128, 174, 255);
        }
    }
</style>
