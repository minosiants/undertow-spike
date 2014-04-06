package com.minosiants.undertowspike;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rs")
public class RestApp extends Application{
	@Override
    public Set<Class<?>> getClasses(){
       HashSet<Class<?>> classes = new HashSet<Class<?>>();
       classes.add(MessageResource.class);
       return classes;
    }
}
