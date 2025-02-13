import { LineChart } from "../../packages/charts-lib/src/components/LineChart"

const App = () => {
    return (
        <LineChart coords={[{x: 20, y: 20}, {x: 40, y: 40}, {x: 50, y: 10}]}/>
    )
}

export default App