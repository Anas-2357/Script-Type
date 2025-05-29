import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";

function App() {
    return (
        <div className="px-32 py-24 flex flex-col gap-24">
            <Navbar />
            <TypingBox />
        </div>
    );
}

export default App;
