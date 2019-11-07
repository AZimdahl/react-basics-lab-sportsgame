(function () {

  function Team(props) {
    return (<div>
      <h4>{props.teamData.name}!</h4>
      <img alt="team logo" width={200} src={props.teamData.logo} />

      <div>
        {" "}Shots: {props.teamStats.shots + " "}
        {" "}Score: {props.teamStats.score + " "}
      </div>

      <button onClick={props.handleShoot}>SHOOT</button>

      {props.teamStats.shots > 0 &&
        <div>
          Shot Percentage: {(props.teamStats.score / props.teamStats.shots).toFixed(3)}
        </div>
      }
    </div>)
  }

  class Game extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        homeTeamStats: {
          shots: 0,
          score: 0,
        },

        awayTeamStats: {
          shots: 0,
          score: 0
        }
      }

      this.sound = new Audio("cheer.mp3")
    }

    handleShoot = (team, event) => {
      const teamKey = `${team}Stats`;
      let curTeam = this.state[teamKey];
      curTeam.shots++;
      if (Math.random() >= .5) {
        curTeam.score++;
        this.sound.play();
      }
      this.setState({
        [teamKey]: curTeam
      })
    }

    handleReset = (event) => {
      let homeTeam = this.state.homeTeamStats;
      let awayTeam = this.state.awayTeamStats;
      homeTeam.shots = 0;
      homeTeam.score = 0;

      awayTeam.shots = 0;
      awayTeam.score = 0;
      this.setState({
        homeTeamStats: homeTeam,
        awayTeamStats: awayTeam
      })
    }

    render() {
      return (<div>
        <h1>Welcome to {this.props.venue} Quidditch Match!</h1>
        <div id="container">

          <div id="homeTeam" className="teamStyle" style={{ backgroundColor: this.props.homeTeam.backgroundColor }}>
            <Team
              teamData={this.props.homeTeam}
              handleShoot={() => this.handleShoot("homeTeam")}
              teamStats={this.state.homeTeamStats}
            />
          </div>

          <div id="awayTeam" className="teamStyle" style={{ backgroundColor: this.props.awayTeam.backgroundColor }}>
            <Team
              teamData={this.props.awayTeam}
              handleShoot={() => this.handleShoot("awayTeam")}
              teamStats={this.state.awayTeamStats}
            />
          </div>
        </div>

        <div>
          <button onClick={this.handleReset}>RESET GAME</button>
        </div>
        
      </div>)
    }
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
      <Game homeTeam={teamThreeObj} awayTeam={teamFourObj} venue="Hogwarts" />
    )
  }

  //Render the application
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();