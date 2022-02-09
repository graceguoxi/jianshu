import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { BsSearch, BsPencil } from "react-icons/bs";
import { AiOutlineSync } from "react-icons/ai";
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button
} from './style'

class Header extends Component {

  
  getListArea() {
    const { focused, list, page, totalPage, mouseIn, hanldeMouseEnter, handleMouseLeave, handlePageChange } = this.props;
    const newList = list.toJS();
    const pageList = [];
    
    if(newList.length) {
      for(let i = (page - 1) * 9; i < page * 9; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if(focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter={hanldeMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            Popular search
          <SearchInfoSwitch 
            onClick={() => handlePageChange(page,totalPage, this.spinIcon)}
          >
            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin"><AiOutlineSync /></i>
            Change
          </SearchInfoSwitch>
          </SearchInfoTitle>
            <SearchInfoList>
            <SearchInfoItem>education</SearchInfoItem>
              {pageList}
            </SearchInfoList>
        </SearchInfo>
      )
    }else {
      return null;
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left'>First page</NavItem>
          <NavItem className='left'>Down lawn App</NavItem>
          {
            login? 
              <NavItem onClick={logout} className='right'>Logout</NavItem> : 
              <Link to='/login'><NavItem className='right'>Login</NavItem></Link>

          }
          <NavItem className='right'>Aa</NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              >
              </NavSearch>
            </CSSTransition>
            <i className={this.props.focused ? 'focused iconfont zoom' : 'iconfont zoom'}><BsSearch /></i> 
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writting'><BsPencil />Write an article</Button>
          </Link>
          <Button className='reg'>Register</Button> 
        </Addition>
      </HeaderWrapper>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    focused:state.getIn(['header','focused']),
    list:state.getIn(['header','list']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
    mouseIn:state.getIn(['header','mouseIn']),
    login:state.getIn(['login','login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      (list.size === 0) && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    hanldeMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handlePageChange(page,totalPage,spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if(originAngle) {
        originAngle = parseInt(originAngle, 10);
      }else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate('+ (originAngle + 360) + 'deg)';
  
;      if(page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      }else {
      dispatch(actionCreators.changePage(1));
      }
    },
    logout() {
      dispatch(loginActionCreators.logout());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);