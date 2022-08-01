package com.highradius.training;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class DeleteValue
 */
@WebServlet("/DeleteValue")
public class DeleteValue extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteValue() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			int delete = Integer.parseInt(request.getParameter("sl_no"));
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","1309");
			String sql = "DELETE FROM winter_internship WHERE sl_no IN (?)" ;
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1,delete);

			if(ps.executeUpdate() > 0){
				Response.put("delete", true);
			}
			else {
				Response.put("delete", false);
			}
			Gson gson = new Gson();
			response.setHeader("Access-Control-Allow-Origin","*");
			String jsonResponse = gson.toJson(Response);
			response.getWriter().append(jsonResponse);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
