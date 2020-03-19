package com.pharmachain.dashboard.domain;

import java.io.Serializable;

import lombok.Data;

@Data
public class OrderSummary implements Serializable {

	private static final long serialVersionUID = 1L;
	private long total;
	private long inProgress;
	private long completed;
	private long cancelled;
	private String filterStartDate;
	private String filterEndDate;
}
