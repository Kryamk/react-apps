import React from 'react'
import Calculator from './components/CalculatorTemperature';
import DataTable from './components/DataTable';
import Test from './components/Test'

function App() {
	return (
		<div className="App">
			<h1>App Default</h1>
			<Test/>
			{/* <Calculator/> */}
			<DataTable/>
		</div>
	);
}

export default App;
