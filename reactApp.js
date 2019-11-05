(function () {

  class Team extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        shots: 0,
        score: 0,
      }

      this.sound = new Audio("cheer.mp3")
    }

    handleShoot = (event) => {
      this.setState((state) => ({
        shots: state.shots + 1
      }))
      if (Math.random() >= .5) {
        this.setState((state) => ({
          score: state.score + 1,
        }))
        this.sound.play();
      }
    }

    render() {
      return (<div backgroundimage={this.props.logo}>
        <h4>Give it up for the {this.props.teamData.name}!</h4>
        <img alt="team logo" width={200} src={this.props.teamData.logo} />
        <div>{" "}Shots: {this.state.shots + " "}
          {" "}Score: {this.state.score + " "}</div>
        <button onClick={this.handleShoot}>SHOOT</button>
        {this.state.shots > 0 &&
          <div>Shot Percentage: {(this.state.score / this.state.shots).toFixed(3)}</div>
        }
      </div>)
    }
  }

  function Game(props) {
    return (<div>
      <h1>Welcome to {props.venue} Quidditch Match!</h1>
      This file represents the code after completing the setup step in the lab instructions
      <div id="container">
        <div id="homeTeam" className="teamStyle" style={{backgroundColor:props.homeTeam.backgroundColor}}><Team teamData={props.homeTeam}/></div>
        <div id="awayTeam" className="teamStyle" style={{backgroundColor:props.awayTeam.backgroundColor}}><Team teamData={props.awayTeam}/></div>
      </div>
    </div>)
  }

  // Deafault App component that all other compents are rendered through
  function App(props) {

    let teamOneObj = {
      name: "Gryffindor",
      logo: "gryffindor.png",
      backgroundColor: "darkred"
    }

    let teamTwoObj = {
      name: "Slytherin",
      logo: "slytherin.png",
      backgroundColor: "darkgreen"
    }

    let teamThreeObj = {
      name: "Ravenclaw",
      logo: "ravenclaw.png",
      backgroundColor: "darkblue"
    }

    let teamFourObj = {
      name: "Hufflepuff",
      logo: "hufflepuff.png",
      backgroundColor: "darkorange"
    }

    return (
      <Game homeTeam={teamThreeObj} awayTeam={teamFourObj} venue="Hogwarts"/>
    )
  }

  //Render the application
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();