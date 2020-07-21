// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;


/** Servlet that returns some example content and handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  /** Creates a storage for comments. */
  private class CommentStore {
    private String name;
    private String message; 
    private long timestamp;
  
    private CommentStore(String name, String message, long timestamp){
      this.name = name;
      this.message = message;
      this.timestamp = timestamp;
    }
  }
  // datastore can be accessed through the entire class. (global variable) 
  // static access and won't be re-assigned.
  static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService(); 

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 
    
    List<CommentStore> commentData = new ArrayList<>();

    // a query is used to extract data from the database 
    Query query = new Query("comment").addSort("timestamp", SortDirection.DESCENDING);
    // datastore is a global variable. 
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      String name = (String) entity.getProperty("name");
      String message = (String) entity.getProperty("message");
      long timestamp = (long) entity.getProperty("timestamp");

      CommentStore comment = new CommentStore(name, message, timestamp);
      commentData.add(comment);
    }
    // convert comments to json string
    String json = convertToJsonUsingGson(commentData); 

    // Send the JSON as the response 
    response.setContentType("application/json;");
    response.getWriter().println(json); 
  }

  private String convertToJsonUsingGson(List<CommentStore> commentData) {
    Gson gson = new Gson();
    String json = gson.toJson(commentData);
    return json;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = getParameter(request, "name-input", "");
    String message = getParameter(request, "text-input", "");
    long timestamp = System.currentTimeMillis();

    Entity taskEntity = new Entity("comment");
    taskEntity.setProperty("name", name);
    taskEntity.setProperty("message", message);
    taskEntity.setProperty("timestamp", timestamp);
    // datastore is a global variable 
    datastore.put(taskEntity);

    // Respond with the result.
    response.sendRedirect("/index.html#comment-container"); // comment on the same page 
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
