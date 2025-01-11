import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadZone from "./components/UploadZone";
import ExtractedContent from "./components/ExtractedContent";
import {useStateContext} from "./components/StateContext"

  

const App = () => {
  
  const {data} = useStateContext()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-grow p-6"
        style={{
          paddingTop: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px",
          padding: "2vh",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <UploadZone/>
        {(
          data && <div className="content-container" style={{ width: "100%", marginTop: "2rem" }}>
            <ExtractedContent />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
