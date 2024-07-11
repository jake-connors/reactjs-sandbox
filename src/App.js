function App() {
    return (
        <div className="container">
            <h1 className="header">hello world!!!!</h1>
        </div>
    );
}

export default App;


// import { connect } from "react-redux";
// import { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Welcome from "./containers/Welcome";
// import Main from "./containers/Main";

// function App() {

//     useEffect(() => {
//         // console.clear();
//         // to-do: cookie check + dispatch to redux user info
//         console.log('app loaded');
//     }, []);

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" Component={Welcome} />
//                 <Route path="/login" Component={Welcome} />
//                 <Route path="/signup" Component={Welcome} />
//                 <Route path="/home" Component={Main} />
//                 <Route path="/search" Component={Main} />
//                 <Route path="/notifications" Component={Main} />
//                 <Route path="/messages" Component={Main} />
//                 <Route path="/profile/:username" exact Component={Main} />
//                 <Route path="/settings" Component={Main} />
//             </Routes>
//         </Router>
//     );
// }

// export default connect()(App);