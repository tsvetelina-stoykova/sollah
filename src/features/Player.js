import "./Player.css";

const Player = ({component, play}) => {

	if(component.doc === "video"  && play) {
		return (
			<video className="video-wrapper" width={ play.width } height={ play.height } controls>
				<source src={ play.url } />
			</video>
		)
	} else if(component.doc === "pdf"  && play){
		return (
			<iframe className="pdf-wrapper" src={play.url} width={play.width} height={play.height}></iframe>
		)
	}
	
	
}

export default Player