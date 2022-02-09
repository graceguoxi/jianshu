import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';

class Topic extends PureComponent {
  render() {
    return (
      <TopicWrapper>
          {
            this.props.list.map((item) => {
              return (
                <TopicItem>
                  <img
                    className='topic-pic'
                    src={item.get('imgUrl')}
                    alt=''
                   />
                  {item.get('title')}
                </TopicItem>
              )
            })
          }
        
        {/* <TopicItem>
          <img
            className='topic-pic' 
            src='//img14.360buyimg.com/img/s100x100_jfs/t19429/345/2114569686/193072/6f671ab/5ae74720N203d91fc.jpg!cc_100x100.webp'
          />
          Hot point
        </TopicItem> */}
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home','topicList'])
});

export default connect(mapState, null )(Topic);