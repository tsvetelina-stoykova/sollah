import "./Player.css";

const Player = ({component, play}) => {
console.log(component, play)
	if(component.doc === "video" && play) {
		return (<div>
			<video className="video-wrapper" width={ play.width } height={ play.height } controls crossOrigin="anonymous">
				<source src={ play.url } />
				{	play.subs ? 
					<track
					  label="English"
					  kind="subtitles"
					  srcLang="en"
					  src={play.subs.replace('.json', '.vtt')}
					  default 
					/> : null
				}
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