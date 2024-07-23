import React from 'react';
import ReactDOM from 'react-dom';
import Flag from "./flag.jsx";


const urls = {
  medals: "https://s3.amazonaws.com/com.veea.medals/medals.json",
  flags: "https://s3.amazonaws.com/com.veea.medals/flags.png"
}

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      medalCount: [],
      selectedMedal: this.props.selectedMedal
    }
  }

  componentDidMount() {
    fetch(urls.flags)
      .then((res) => res.blob())
      .then((data) => this.setState({imageUrl: URL.createObjectURL(data)}))

    fetch(urls.medals)
      .then((res) => res.json())
      .then((data) => {
        
        data.forEach((dataPoint) => {
          let total = dataPoint["gold"] + dataPoint["silver"] + dataPoint["bronze"]
          dataPoint.total = total
        })

        this.setState({medalCount: data})
      })
  }

  sortByMedalType(medalType) {
    let newMedalCount = this.state.medalCount.sort((a, b) => {
      if (b[medalType] === a[medalType]) {
        return b["gold"] - a["gold"]
      }
      return b[medalType] - a[medalType]
    })

    this.setState({
      selectedMedal: medalType,
      medalCount: newMedalCount
    })
  }

  render() {
    let rows = this.state.medalCount.map((countryMedal, idx) => {
      return (
        <tr key={countryMedal.code}>
          <td>{idx + 1}</td>
          <td className={"flag-cell"}>
              <Flag imageUrl={this.state.imageUrl}
                    flag={countryMedal.code}/>
          </td>
          <td>{countryMedal.gold}</td>
          <td>{countryMedal.silver}</td>
          <td>{countryMedal.bronze}</td>
          <td className={"total-count"}>{countryMedal.total}</td>
        </tr>
      )
    })

    let selected = this.state.selectedMedal

    return (
      <div>
        <div className={"medal-header"}>Medal Count</div>
        <table>
          <thead>
             <tr>
                 <th></th>
                 <th></th>
                 <th className={`${selected === "gold" ? "selected" : ""}`} onClick={this.sortByMedalType.bind(this, "gold")}>
                   <div className={`circle gold`}></div>
                 </th>
                 <th className={`${selected === "silver" ? "selected" : ""}`} onClick={this.sortByMedalType.bind(this, "silver")}>
                   <div className={"circle silver"}></div>
                 </th>
                 <th className={`${selected === "bronze" ? "selected" : ""}`} onClick={this.sortByMedalType.bind(this, "bronze")}>
                   <div className={"circle bronze"}></div>
                 </th>
                 <th className={`${selected === "total" ? "selected" : ""} total`} onClick={this.sortByMedalType.bind(this, "total")}>TOTAL</th>
             </tr>
         </thead>
         <tbody>
           {rows}
         </tbody>
        </table>
      </div>
    )
  }
}

window.widget = {
  initialize: function(elementId, selectedMedal = "gold") {
    document.addEventListener("DOMContentLoaded", () => {
      ReactDOM.render(<Root selectedMedal={selectedMedal}/>, document.getElementById(elementId))
    })
  }
}
