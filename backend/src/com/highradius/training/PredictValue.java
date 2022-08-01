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
 * Servlet implementation class PredictValue
 */
@WebServlet("/PredictValue")
public class PredictValue extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PredictValue() {
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
			int sl_no = Integer.parseInt(request.getParameter("sl_no"));
			String aging_bucket = request.getParameter("aging_bucket");
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","1309");
			
			String query = "UPDATE winter_internship SET aging_bucket = ? WHERE sl_no = ?";
			
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, aging_bucket);
			ps.setInt(2, sl_no);
			
			ps.executeUpdate();
			if(ps.executeUpdate() > 0){
				Response.put("predict", true);
			}
			else {
				Response.put("predict", false);
			}
			Gson gson = new Gson();
			response.setHeader("Access-Control-Allow-Origin","*");
			String jsonResponse = gson.toJson(Response);
			response.getWriter().append(jsonResponse);
			con.close();
		}
		catch (Exception e) {
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
