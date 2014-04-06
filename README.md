undertow-spike
==============

## Spike how to use [undertow.io](http://undertow.io/) web server 

Undertow is a flexible performant web server written in java, providing both blocking and non-blocking API’s based on NIO.


Looks like very easy to use.
Start time is so quick.

 Bellow the man setting of the server
 
 [Resteasy ](http://www.jboss.org/resteasy) Undertow Server is used for the REST
 
 [Twitter Flight](http://twitter.github.io/flight/) for UI
 

 ```java
 
 public class App {

	public static void main(String[] args) throws URISyntaxException {
		String WEB_DIR="....   /undertow-spike/src/web/app";
		
		UndertowJaxrsServer jaxRsserver = new UndertowJaxrsServer();
	    jaxRsserver.deploy(RestApp.class);
	    jaxRsserver.start(Undertow.builder().addHttpListener(8081, "localhost"));		
		
	        
	    SimpleProxyClientProvider  proxyClientProvider = new SimpleProxyClientProvider(new URI("http://localhost:8081/rs"));
	    
		Undertow server = Undertow.builder()
                .addHttpListener(8080, "localhost")
                .setHandler(path()
                		.addPrefixPath("/", resource_welcome(WEB_DIR))
                        .addPrefixPath("/ws", websocket_ws())
                        .addPrefixPath("/rs", proxyHandler(proxyClientProvider))
                        .addPrefixPath("/assets", resource_assets(WEB_DIR)))
                .build();
        server.start();        
	}
	
	private static HttpHandler resource_welcome(String webdir) {
		System.out.println(webdir);
		return resource(new FileResourceManager(new File(webdir), 100)).addWelcomeFiles("index.html");
	}

	private static HttpHandler resource_assets(String webdir) {		
		return resource(new FileResourceManager(new File(webdir+"/assets"), 100));
	}

	public static WebSocketProtocolHandshakeHandler websocket_ws() {
		return websocket(new WebSocketConnectionCallback() {

			@Override
			public void onConnect(WebSocketHttpExchange exchange, WebSocketChannel channel) {
				channel.getReceiveSetter().set(new AbstractReceiveListener() {

					@Override
					protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) {
						WebSockets.sendText(message.getData(), channel, null);
					}
				});
				channel.resumeReceives();
			}
		});
	}
 
 ```






