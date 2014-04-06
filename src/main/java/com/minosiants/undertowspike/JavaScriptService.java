package com.minosiants.undertowspike;

import java.io.File;

import io.undertow.util.FileUtils;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class JavaScriptService {

	
	public static void main(String[] args) throws ScriptException {
		ScriptEngineManager manager = new ScriptEngineManager();		
		ScriptEngine engine = manager.getEngineByName("nashorn");
		
		System.out.println(engine.eval(FileUtils.readFile(new File("/home/kaspar/stuff/workspaces/java/undertow-spike/src/web/app/js/main.js"))));
		
		 
		
	}
}
