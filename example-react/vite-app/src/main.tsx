// Must be the first import
import "preact/debug";

import { render } from 'preact'
import { App } from './app'
import './index.css'

render(<App />, document.getElementById('app')!)
