import "./Player.css";

const Player = ({component, play}) => {

	if(component.doc === "video" && play) {
		return (<div>
			<video className="video-wrapper" width={ play.width } height={ play.height } controls>
				<source src={ play.url } />
			</video>
			</div>
		)
	} else if((component.doc === "pdf" || component.doc === "ppt")  && play){
		return (
			<iframe title="Training materials" className="pdf-wrapper" src={play.url} width={play.width} height={play.height}></iframe>
		)
	}
	
	
}

export default Player