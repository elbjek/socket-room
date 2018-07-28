<template>
  <div class="echo">
      <h1>Echo room</h1>

        <p v-if="socketConnection">{{connected}}</p>
        
        <p v-for="msg in messages" :key="msg.id">
          {{ msg }}
        </p>

        <p v-if="socketConnection">
          {{disconnected}}
        </p>

      <form action="#" method="post" @submit.prevent="connect">
        <input type="text" v-model="newMsg" autofocus placeholder="Send a message">
        <button>SEND</button>
      </form>

        <button @click="connect">Connect</button>
        <button @click="disconnect">Disconnect</button>

  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      newMsg: "",
      messages: [],
      socket: io("localhost:3000"),
      connected: "",
      disconnected: "",
      socketConnection: false
    };
  },
  methods: {
    connect() {
      this.socket.emit("sendMessage", this.newMsg);
    },
    disconnect(data) {
      this.socket.emit("disconnect", {
        customEvent: "Disconnected from server"
      });
    }
  },
  mounted() {
    this.socket.on("click", data => {
      this.messages.push(data.msgs);
      this.connected = data.connected;
      (this.newMsg = ""), (this.socketConnection = true);
    });

    this.socket.on("function", data => {
      this.socketConnection = true;
      this.disconnect = data.msg;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: gray;
  width:700px;
  margin:0 auto;
  border-radius: 8px;
}
h1{
  background-color: crimson;
  color:white;
  font-weight: 900;
}
.echo > p{
  color:white;
  font-weight: bold;
}
form>input{
  width:250px;
  margin:0 auto;
  padding: 8px 10px;
  margin-bottom:30px
}
form>button{
  color:black;
  border:none;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 0;
  background-color: white;
}
button{
  border:none;
  color:white;
  background-color: crimson;
  font-weight: 700;
  padding:8px 15px;
  border-radius: 8px;
  margin: 0px 20px 30px 20px
}
</style>
