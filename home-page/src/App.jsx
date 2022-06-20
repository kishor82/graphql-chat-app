import React from "react";
import ReactDOM from "react-dom";
import { Container } from "shards-react";
import Chat from "chat/Chat";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.css";

const App = () => (
  <Container>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
      consequuntur, sint ad fugit error corporis corrupti fuga veritatis! Magni
      sunt fuga quibusdam fugiat libero molestiae similique, exercitationem
      excepturi eveniet magnam fugit unde et sapiente iusto. Maxime, accusantium
      dolores. Natus soluta officia optio recusandae corrupti veniam quas, ullam
      non at quae nostrum et eaque. Consequuntur corrupti velit esse eum
      cupiditate nihil vitae culpa nesciunt reiciendis atque illum reprehenderit
      eius perspiciatis quae, sed dolore suscipit enim? Velit dolores ea aut
      quia! Earum ducimus pariatur quasi iste expedita, eligendi aperiam
      explicabo dicta, impedit sequi voluptas veniam sed odit reprehenderit
      tempore! Sed, sapiente distinctio.
    </p>
    <h1>Chat!</h1>
    <Chat />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ratione
      temporibus! Totam, consequatur? Sint amet assumenda inventore ex, saepe
      soluta, necessitatibus aut officia quidem molestias porro quas.
      Consectetur, debitis ullam cumque repellendus eius dolore. Fuga, aliquid.
      Distinctio, nobis. Quas dignissimos sunt fugiat numquam inventore ipsam
      dolores suscipit nulla veniam doloribus!
    </p>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("home-page"));
