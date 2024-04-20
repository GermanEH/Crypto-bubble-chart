declare namespace Types {
    export type Coin = {
        symbol: string;
        image: string;
        priceChange: string;
        priceChangePercentage: number;
        cx: number;
        cy: number
    }
    export type ForceData = {
            size: number

    }
    export type ForceDataComplete = {
            size: number
            x: number
            y: number
            v: number
    }
}

export const Types