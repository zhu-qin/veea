import React from 'react';

const flagLookUp = {
  "AUT": 0,
  "BLR": 17,
  "CAN": 34,
  "CHN": 51,
  "FRA": 68,
  "GER": 85,
  "ITA": 102,
  "NED": 119,
  "NOR": 136,
  "RUS": 153,
  "SUI": 170,
  "SWE": 187,
  "USA": 204
}

class Flag extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const image = this.refs.image
    const ctx = this.refs.canvas.getContext('2d')
    image.onload = () => {
      ctx.drawImage(image, 0, flagLookUp[this.props.flag], 28, 17, 0, 0, 28, 17)
    }
  }

  render() {
    return (
      <div className={"flex"}>
        <img ref="image" src={this.props.imageUrl} className={"hidden"}/>
        <canvas ref="canvas" width={28} height={17}></canvas>
        <div className={"flag-name"}>{this.props.flag}</div>
      </div>
    )
  }
}

export default Flag;
