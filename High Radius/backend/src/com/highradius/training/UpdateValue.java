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
 * Servlet implementation class UpdateValue
 */
@WebServlet("/UpdateValue")
public class UpdateValue extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateValue() {
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
			String invoice_currency = request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","1309");
			String sql = "UPDATE winter_internship set invoice_currency = ? , cust_payment_terms = ? where sl_no = ?" ;
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setString(1,invoice_currency);
			ps.setString(2,cust_payment_terms);
			ps.setInt(3,sl_no);

			if(ps.executeUpdate() > 0){
				Response.put("update", true);
			}
			else {
				Response.put("update", false);
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
