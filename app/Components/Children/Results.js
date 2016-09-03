// Include React 
var React = require('react');

// This is the results component
var Results = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Results</h3>
				</div>
				<div className="panel-body text-center">

						<h1>Address:</h1>

						{this.props.address.map(function(search, i)
						{
							return <p key={i}>{search.title} - {search.url} - {search.date} </p> 
						}

					)}
				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Results;