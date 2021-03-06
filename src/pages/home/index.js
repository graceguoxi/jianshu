import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import List from './components/List';
import Recommend from './components/Recommend';
import Topic from './components/Topic';
import Writer from './components/Writer';
import { actionCreators } from './store';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style';

class Home extends PureComponent {

  handleScrollTop() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img alt='' className='banner-img' src="//imgcps.jd.com/ling4/100026667858/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa02/2ebd3685/cr/s/q.jpg" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        {this.props.showScroll? <BackTop onClick={this.handleScrollTop}>Back to Top</BackTop> : null } 
      </HomeWrapper>
    )
  }

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow);
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow);
  }
}

const mapState = (state) => ({
  showScroll: state.getIn(['home','showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo()
    dispatch(action);
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 150) {
      dispatch(actionCreators.toggleTopShow(true))
    }else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
});

export default connect(mapState, mapDispatch) (Home);