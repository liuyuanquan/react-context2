import React, { Component } from 'react'
import './App.css'

const { Provider, Consumer } = React.createContext({
  theme: 'none'
})

const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}

const withTheme = WrappedComponent => {
  class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    render() {
      return (
        <Consumer>
          {
            value => <WrappedComponent {...this.props} {...value} ref={this.props.forwardRef}>{this.props.children}</WrappedComponent>
          }
        </Consumer>
      )
    }
  }
  return React.forwardRef((props, ref) => (
    <HOC {...props} forwardRef={ref} />
  ))
}

@withTheme
class Header extends Component {
  render() {
    const { theme, handleChange } = this.props 
    return (
      <header className={theme}>
        <label htmlFor='theme'>切换主题：</label>
        <select name='theme' value={theme} onChange={handleChange}>
          <option value='dark'>dark</option>
          <option value='light'>light</option>
          <option value='none'>none</option>
        </select>
      </header>
    )
  }
}

@withTheme
class Aside extends Component {
  render() {
    const { theme } = this.props
    return (
      <aside className={theme}>
        侧边栏
      </aside>
    )
  }
}

@withTheme
class Main extends Component {
  render() {
    const { theme } = this.props
    return (
      <main className={theme}>
        主体
      </main>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light' // dark light none
    }
    this.handleChange = this.handleChange.bind(this)
    this.headerRef = React.createRef()
    this.asideRef = React.createRef()
    this.mainRef = React.createRef()
  }
  handleChange(e) {
    this.setState({
      theme: e.currentTarget.value
    })
  }
  render() {
    const { theme } = this.state
    const { handleChange, headerRef, asideRef, mainRef } = this
    return (
      <Provider value={{theme}}>
        <Header handleChange={handleChange} ref={headerRef}/>
        <Aside ref={asideRef}/>
        <Main ref={mainRef}/>
      </Provider>
    )
  }
}

export default App
