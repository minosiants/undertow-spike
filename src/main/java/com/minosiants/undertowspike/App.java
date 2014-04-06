package com.minosiants.undertowspike;

import static io.undertow.Handlers.path;
import static io.undertow.Handlers.proxyHandler;
import static io.undertow.Handlers.resource;
import static io.undertow.Handlers.websocket;
import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.handlers.proxy.SimpleProxyClientProvider;
import io.undertow.server.handlers.resource.FileResourceManager;
import io.undertow.websockets.WebSocketConnectionCallback;
import io.undertow.websockets.WebSocketProtocolHandshakeHandler;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import io.undertow.websockets.spi.WebSocketHttpExchange;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;

import org.jboss.resteasy.plugins.server.undertow.UndertowJaxrsServer;


public class App {

	public static void main(String[] args) throws URISyntaxException {
		String WEB_DIR=" ..../undertow-spike/src/web/app";
		
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

}
