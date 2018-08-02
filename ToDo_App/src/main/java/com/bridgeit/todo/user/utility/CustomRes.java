package com.bridgeit.todo.user.utility;

public class CustomRes {

	private  int status;
	private String msg;
	
	public CustomRes(int status,String msg) {
		this.status=status;
		this.msg=msg;
		
	}
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
