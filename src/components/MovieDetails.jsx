// also MovieDetails is going to be a Class Component
// now we're going to refactor it as a function! :)

import { useEffect, useState } from "react";
import { Card, Spinner } from 'react-bootstrap'

const MovieDetails = ({ title }) => {

    // constructor(props) {
    //     super(props)
    //     // the constructor method comes before anything else, even the initial render!
    //     // the good thing is that you really don't need to use it...
    //     // super() is just calling the constructor of Component
    //     // you HAVE to do it before doing anything else with the constructor
    //     console.log('CONSTRUCTOR!')
    //     // the constructor has historically been used for two things (not relevant anymore...)
    //     // 1) setting the initial state
    //     // this.state = {
    //     //     movieInfo: null
    //     // }
    //     // 2) for manually binding the 'this' into event handlers
    //     // this.handleClick = this.handleClick.bind(this)
    // }

    // state = {
    //     movieInfo: null
    // }

    const [movieInfo, setMovieInfo] = useState(null)

    // componentDidMount() {
    //     // this will happen AFTER the initial render() invokation
    //     // here I can grab the movie details!
    //     this.fetchMovieDetails()
    // }

    useEffect(() => {
        fetchMovieDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    // componentDidUpdate(prevProps, prevState) {
    //     // componentDidUpdate will be triggered automatically by your component
    //     // whenever a state change or a props change is being detected
    //     // that's exactly the same behavior as render()
    //     console.log('the component just updated!')
    //     // we want to execute fetchMovieDetails() when the title prop changes
    //     // what we DON'T want is execute fetchMovieDetails when the STATE changes

    //     // what is the solution? calling componentDidUpdate JUST when the title prop changes,
    //     // not when a new state is set

    //     if (this.props.title !== prevProps.title) {
    //         // the condition points to a new selection in the dropdown
    //         // this.props.title <-- the new superhero you just selected
    //         // prevProps.title <-- the previous superhero in the dropdown
    //         console.log("new superhero detected! let's fetch the new data!")
    //         this.fetchMovieDetails()
    //     }

    //     // GOLDEN RULE: every time you use componentDidUpdate, you need a condition.
    //     // you need a handbrake to stop your componentDidUpdate to be unconditionally called again!
    //     // because it's VERY EASY to enter an infinite loop
    // }

    const fetchMovieDetails = async () => {
        try {
            let response = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + title)
            // this.props.title initially is "Batman Begins" because that's the initial value of the
            // movieTitle state property in App
            // console.log('response', response)
            let data = await response.json()
            // console.log(data.Search[0])
            // set the state of this component with the search result
            // so I can show it in the interface
            // chances are, if you're performing a fetch into your component
            // you also want to store its result into the state
            // this.setState({
            //     movieInfo: data.Search[0]
            // })
            setMovieInfo(data.Search[0])
        } catch (error) {
            console.log('error', error)
        }
    }

    // const handleClick = () => {
    //     console.log(title)
    //     // this is undefined!
    // }

    // componentWillUnmount() {
    //     // this happens a moment before the REMOVAL of a component from the DOM
    //     // it's primarely used for CLEANUP OPERATIONS...
    //     // this is perfect for closing open connections, clearing timers
    //     console.log('BYE BYE!')
    // }

    useEffect(() => {
        return () => {
            console.log('BYE BYE!')
        }
    }, [])
    // a replacement for componentWillUnmount

    // render() is not a good place for data fetching! :(
    // render() fires again when the state changes!
    console.log('render! movieInfo is', movieInfo)
    return (
        <div>
            <h2>MOVIE DETAILS</h2>
            {
                movieInfo ? (
                    <Card>
                        <Card.Img variant="top" src={movieInfo.Poster} />
                        <Card.Body className="text-dark">
                            <Card.Title>{movieInfo.Title}</Card.Title>
                            <Card.Text>
                                {movieInfo.Year} - {movieInfo.imdbID}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <Spinner animation="border" variant="success" />
                )
            }
            {/* this is the short circuit && variant */}
            {/* {
                    this.state.movieInfo && (
                        <Card>
                            <Card.Img variant="top" src={this.state.movieInfo.Poster} />
                            <Card.Body className="text-dark">
                                <Card.Title>{this.state.movieInfo.Title}</Card.Title>
                                <Card.Text>
                                    {this.state.movieInfo.Year} - {this.state.movieInfo.imdbID}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                } */}
        </div>
    )
}

export default MovieDetails