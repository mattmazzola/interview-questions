import {connectFour, Players} from './connectFour'

describe("Code Wars", () => {
    describe("Connect Four", () => {
        test("given sequence of mvoes that do not contain winner return None", () => {
            const noWinner: string[] = [
                "A_Red",
                "B_Yellow",
                "C_Red",
                "D_Yellow",
                "E_Red",
                "F_Yellow",
                "G_Red",
                "A_Yellow",
                "B_Red",
                "C_Yellow",
                "D_Red",
                "E_Yellow"
            ]

            expect(connectFour(noWinner).winner).toBe(Players.None)
        })

        test("given sequence of moves that contain horizontal winner return the winner", () => {
            const horizontalWinner: string[] = [
                "A_Red",
                "A_Yellow",
                "B_Red",
                "B_Yellow",
                "C_Red",
                "C_Yellow",
                "D_Red",
                "D_Yellow",
                "E_Red",
                "E_Yellow"
            ]

            const winner = connectFour(horizontalWinner)
            console.log(winner.field)
            expect(winner.winner).toBe(Players.Red)
        })

        test("given sequrence of moves that contain vertical winner return winner", () => {
            const verticalWinner: string[] = [
                "A_Red",
                "B_Yellow",
                "A_Red",
                "B_Yellow",
                "A_Red",
                "B_Yellow",
                "A_Red",
                "B_Yellow"
            ]

            expect(connectFour(verticalWinner).winner).toBe(Players.Red)
        })

        test("given sequrence of moves that contain diagonal up right winner return winner", () => {
            const diagonalDownRightWinner: string[] = [
                "A_Red",
                "B_Yellow",
                "B_Red",
                "C_Yellow",
                "C_Red",
                "D_Yellow",
                "C_Red",
                "D_Yellow",
                "E_Red",
                "D_Yellow",
                "D_Red",
                "E_Yellow",
                "E_Red",
                "E_Yellow",
                "F_Red",
                "F_Yellow",
                "E_Red",
                "F_Yellow"
            ]

            const winner = connectFour(diagonalDownRightWinner)
            console.log(winner.field)
            expect(winner.winner).toBe(Players.Red)
        })

        test("given sequence containing diagonal up left winner return winner", () => {
            const field: string[] = [
                "G_Red",
                "F_Yellow",
                "F_Red",
                "E_Yellow",
                "D_Red",
                "E_Yellow",
                "E_Red",
                "D_Yellow",
                "C_Red",
                "D_Yellow",
                "D_Red",
                "C_Yellow",
                "C_Red",
                "C_Yellow",
                "C_Red"
            ]

            const result = connectFour(field)
            console.log(result.field)
            expect(result.winner).toBe(Players.Red)
        })
    })
})