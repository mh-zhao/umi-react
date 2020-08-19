import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const mapStateToProps = (state:any) => (
  {
    count: state.common.count,
    breadcrumb: state.common.breadcrumb,
  }
);

@connect(mapStateToProps)

class Index extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  add = () => {
    const { dispatch, count } = this.props;
    dispatch({
      type: 'common/save',
      payload: {count: 5}
    })
    console.log('props',this.props)
  }

  render() {
    const { count } = this.props;
    // console.log('首页', this.props)
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
    );
  }
}

Index.title = '首页';
Index.propTypes = {
  count: PropTypes.string
};

export default Index;