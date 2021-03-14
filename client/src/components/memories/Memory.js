import React from 'react';

class Memory extends React.Component {
    render() {
        return(
            <h1>memory</h1>
        //     <div class="container">
        //         <div class="d-flex flex-column justify-content-center align-items-center">
        //             <h1>{{username}}'s stories at {{memory.city.name}} City</h1>
        //             {{#each memory.stories }}
        //             <img src="{{imgPath}}">
        //             <p>{{imgCaption}}</p>
        //             <p>{{description}}</p>
        //             <p><a href="/memories/{{../memory._id}}/delete/{{_id}}">Delete this picture</a></p>
        //             {{!-- <button id={{}}>Edit this picture</button> --}}
        //             {{!-- <a href="/memories/{{../memory._id}}/edit/{{_id}}">Edit this picture</a> --}}
        //             {{/each}}
        //             <button type="button" class="btn btn-primary mb-5" data-toggle="modal" data-target="#addStoryModal"><i class="fas fa-user-plus fa-lg"></i><span class="md-hidden d-inline"> Add a Story</span></a></button>
        //         </div>
        //     </div>
        )
    }
}

export default Memory
