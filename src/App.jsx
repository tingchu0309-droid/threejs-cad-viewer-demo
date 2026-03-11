import Viewer3D from "./components/Viewer3D"
import "./App.css"

function App() {
  return (
    <div className="app-layout">
      <div className="top-bar">
        <h1>threejs-cad-viewer</h1>
      </div>

      <div className="main-content">
        <div className="viewer-section">
          <Viewer3D />
        </div>

        <div className="side-panel">
          <h2>Model Info</h2>
          <p>Status: Demo box loaded</p>
          <p>Viewer is working</p>
          <p>Author: Jay Chu</p>
        </div>
      </div>
    </div>
  )
}

export default App