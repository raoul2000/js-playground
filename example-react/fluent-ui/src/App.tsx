import React from 'react';
import { MainToolbar } from "./components/MainToolbar";
import {LeftBar} from './components/LeftBar';

function App() {
  return (
    <div className="app">
      <div className="header">
        <MainToolbar />
      </div>
      <div className="body">
        <div className="left-bar">
          <LeftBar />

        </div>
        <div className="middle-bar">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, laboriosam qui sit fuga nisi modi labore placeat mollitia aliquam accusantium facere neque, officia praesentium, repellat sint assumenda a nulla? Aspernatur?
        </div>
        <div className="right-bar">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam alias maiores nostrum quidem explicabo beatae quis asperiores, consequuntur nam ullam saepe unde illum tenetur impedit cumque excepturi et blanditiis praesentium.
        </div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
}

export default App;
