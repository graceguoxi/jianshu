import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { BsFillHeartFill, BsFillChatSquareDotsFill } from "react-icons/bs";
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  render() {
    const { list, getMoreList, page} = this.props;
    console.log("list", JSON.stringify(list))
    return (
      <div>
        {
          list.map((item,index) => {
            return (
              <Link key={index} to={'/detail?id=' + item.get('id')}>
                <ListItem>
                  <img alt='' 
                    className='pic' 
                    src={item.get('imgUrl')} />
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='desc'>{item.get('desc')}</p>
                    {/* <i className='heart'><BsSearch /></i>  */}
                    <i className="bi bi-heart"><BsFillHeartFill />{item.get('heart')}</i> <i className="bi bi-chat"><BsFillChatSquareDotsFill />{item.get('chat')}</i>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>Load More</LoadMore>
    
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home','articleList']),
  page: state.getIn(['home','articlepage'])
});

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    dispatch(actionCreators.getMoreList(page))
  }
})

export default connect(mapState, mapDispatch)(List);