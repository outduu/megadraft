/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  withRouter,
  hashHistory,
  Router,
  Route,
  IndexRoute
} from "react-router";
import Scroll from "react-scroll";
import { StickyContainer } from "react-sticky";

import getMuiTheme from "material-ui/styles/getMuiTheme";
// import FlatButton from "material-ui/FlatButton";
// import { darkBlack, white, yellow600 } from "material-ui/styles/colors";
// import MenuItem from "material-ui/MenuItem";
// import RaisedButton from "material-ui/RaisedButton";
// import Popover from "material-ui/Popover";
// import Divider from "material-ui/Divider";
// import Menu from "material-ui/Menu";
// import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";

import Home from "./components/home";
import Docs from "./components/docs";
import MyRawTheme from "./components/megadrafttheme";
import Example from "./components/example";
// import Header from "./components/header";
import { highlightCode } from "./components/highlightCode";
// import LetsRockArrow from "./components/icons/arrow-down";

// import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
// injectTapEventPlugin();
// const LinkScroll = Scroll.Link;
// const Element = Scroll.Element;
const scroller = Scroll.scroller;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: true
    };
    this.handleClick = ::this.handleClick;
    this.handleTouchTap = ::this.handleTouchTap;
    this.handleRequestClose = ::this.handleRequestClose;
  }

  componentDidMount() {
    highlightCode(this);
  }

  componentDidUpdate() {
    highlightCode(this);
    scroller.scrollTo("appbar", { duration: 300 });
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  handleClick() {
    if (this.state.content) {
      highlightCode(this);
      this.setState({
        content: !this.state.content
      });
    } else {
      highlightCode(this);
      this.setState({
        content: !this.state.content
      });
    }
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    scroller.scrollTo("appbar", { duration: 300, smooth: true });

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    // const { router } = this.props;
    // this.isHome = router.isActive("/", true);

    return (
      <div className="sss">
        <StickyContainer>
          <div className={this.state.content ? "" : "container--dark"}>
            {React.cloneElement(this.props.children, {
              activeContent: this.state.content
            })}
          </div>
        </StickyContainer>
      </div>
    );
  }
}

Page.childContextTypes = {
  muiTheme: PropTypes.object
};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={withRouter(Page)}>
      <IndexRoute component={Home} />
      <Route path="/docs/:doc" component={Docs} />
      <Route path="/dev" component={Example} />
    </Route>
  </Router>,
  document.getElementById("react-container")
);

/* global hljs */
hljs.initHighlightingOnLoad();

if (process.env.NODE_ENV === "production") {
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  /* global ga */
  ga("create", "UA-77313227-1", "auto");
  ga("send", "pageview");
}
