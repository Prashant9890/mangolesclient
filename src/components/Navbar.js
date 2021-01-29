import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#" className="bars" onClick={this.props.onBarClick}></a>
            <a className="navbar-brand" href="">
            मंगलेश्वोर एग्रो भेट सप्लायर्स
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
