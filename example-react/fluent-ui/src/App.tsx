import React from 'react';
import { MainToolbar } from "./components/MainToolbar";
import { LeftBar } from './components/LeftBar';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';

/* function App() {
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
} */
// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
  },
};

const stackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};

function App() {
  return (
    <div className="app">
      <div className="header">
        <MainToolbar />
      </div>
      <Stack horizontal  tokens={stackTokens}>
        <Stack.Item disableShrink >
          <LeftBar />
        </Stack.Item>
        <Stack.Item grow={1}>
          Grow is 2
      </Stack.Item>
        <Stack.Item grow={3}>
          Grow is 1
      </Stack.Item>
      </Stack>
      <div className="footer">footer</div>
    </div>
  );
}

export default App;
