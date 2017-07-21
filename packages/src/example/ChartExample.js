import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import ResponsiveBarChart from 'common/chart-lib/chart/ResponsiveBarChart';
import ResponsiveLineChart from 'common/chart-lib/chart/ResponsiveLineChart';
import ResponsiveVerticalBarChart from 'common/chart-lib/chart/ResponsiveVerticalBarChart';

function exampleBarChart() {
  const chartConfig = {
    // width: 200,
    // height: 160,
    data: [
      { region: 'CN', volume: 30 },
      { region: 'BE', volume: 20 },
      { region: 'TX', volume: 40 },
      { region: 'JD', volume: 20 },
      { region: 'DF', volume: 10 },
      { region: 'OD', volume: 40 },
    ],
    fields: {
      x: 'region',
      y: 'volume',
    },
    axisNames: {
      x: 'Any Name',
      y: 'Any Name',
    },
  };
  return <ResponsiveBarChart {...chartConfig} />;
}

function exampleRelativeBarChart() {
  const chartConfig = {
    // width: 640,
    // height: 220,
    data: [
      { region: 'Nordic Countries', volume: 30 },
      { region: 'Eastern Europe', volume: -20 },
      { region: 'Latin America', volume: 40 },
      { region: 'Asia', volume: -20 },
      { region: 'Middle East', volume: -30 },
      { region: 'Western Europe', volume: 40 },
    ],
    fields: {
      x: 'volume',
      y: 'region',
    },
    axisNames: {
      x: 'Any X Name',
      y: 'Any Y Name',
    },
  };
  return <ResponsiveVerticalBarChart {...chartConfig} />;
}

function exampleLinearLineChart() {
  const chartConfig = {
    // current behaviour: if dimension specified it is fixed, if not responsive
    // width: 320,
    // height: 240,
    data: [
      { volume: 0, price: 9 },
      { volume: 10, price: 30 },
      { volume: 20, price: 10 },
      { volume: 30, price: 40 },
      { volume: 40, price: 10 },
      { volume: 50, price: 40 },
      { volume: 60, price: 10 },
      { volume: 70, price: 30 },
      { volume: 80, price: 10 },
      { volume: 100, price: 30 },
    ],
    fields: {
      x: 'volume',
      y: 'price',
    },
    axisNames: {
      x: 'Any Name',
      y: 'Any Name',
    },
  };
  return <ResponsiveLineChart {...chartConfig} />;
}

function exampleTimeLineChart() {
  const chartConfig = {
    // width: 320,
    // height: 240,
    // DOC: input data date must be sorted
    // TODO: sort the date data
    // TODO: format of month tag on small
    data: [
      { date: moment('2017-01-01'), price: 30 },
      { date: moment('2017-01-15'), price: 20 },
      { date: moment('2017-01-16'), price: 40 },
      { date: moment('2017-01-18'), price: 90 },
      { date: moment('2017-02-01'), price: 40 },
    ],
    fields: {
      x: 'date',
      y: 'price',
    },
    axisNames: {
      x: 'Any Name',
      y: 'Any Name',
    },
  };
  return <ResponsiveLineChart {...chartConfig} />;
}

// TODO: targets data format need to be specified
export class ChartExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
  };

  componentWillMount() {
    // window.performance.mark('App');
  }

  componentDidMount() {
    // console.log(window.performance.now('App'));
  }

  render() {
    const { className } = this.props;

    return (
      <div {...{ className }}>
        <div className="responsive">{exampleBarChart()}</div>
        <div className="responsive">{exampleRelativeBarChart()}</div>
        <div className="responsive">{exampleLinearLineChart()}</div>
        <div className="responsive">{exampleTimeLineChart()}</div>
      </div>
    );
  }
}

// DOC: needs a default padding of 60px
export default styled(ChartExample)`
  position: relative;
  width: 100%;
  height: 960px;

  .responsive {
    position: relative;
    width: 100%;
    height: 320px;
  }
`;
