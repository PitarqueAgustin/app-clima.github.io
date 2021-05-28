
export default function Card(){
	
	return(
	<div className="card spacer-y">
		<{this.props.icon} className="icons" /> <h3> Máxima: </h3> <span>{this.props.data}°</span>
	</div>
	);
	
}
