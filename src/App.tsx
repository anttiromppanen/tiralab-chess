import ChessboardBase from "./components/ChessboardBase/ChessboardBase";

// TODO
// g7 bP attacks f8, but not h8 square
// fix checkmate, currently cannot block checkmate by another piece

function App() {
  return (
    <main className="flex h-[100dvh] w-full items-center justify-center md:h-screen">
      <ChessboardBase />
    </main>
  );
}

export default App;
