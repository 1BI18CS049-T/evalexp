var stack1=[];
var num=[];
var top2=-1;
var top1=-1;
var eval1=0;
var MAX=300;
function line()
{
	var i;
	//document.write()
	for(i=0;i<42;i++)
		document.write("-");
	document.write("<br>");
}
function heading()
{
	line();
	document.write("solving of an infix expression");
	line();
	document.write("containing operators *,/,-,+ operators");
}
function push1(item)                                                
{
	if(top1>=MAX-1)
	{
		printf("is full\n");
	}
	else
	{
		top1=top1+1;
		num[top1]=item;
	}
}
function isdigit(item)
{
	if( item>='0' && item<='9')
		return 1
	else
		return 0;
}
function pop1()                                                            
{
	var item;
	if(top1<0)
	{
		eval1=-2;
		return 0.0;
	}
	else
	{
		item=num[top1];
		top1=top1-1;
		return(item);
	}
}
function push(item)                                                  
{
	if(top2>=MAX-1)
	{
		printf("id full\n");
	}
	else
	{
		top2=top2+1;
		stack1[top2]=item;
	}
}
function pop()                                                          
{
	var item;
	if(top2<0)
	{
		eval=-2;
		return '0';
	}
	else
	{
		item=stack1[top2];
		top2=top2-1;
		return(item);
	}
}
function is_operator(symbol)                                           
{
	if((symbol== '+')||(symbol== '-')||(symbol== '*')||(symbol== '/'))
	{
		return 1;                                                         
	}
	else if(symbol=='(')
	{
		return 0;                                                         
	}
	else 
	{
		return -1;
	}
}
function precedence(symbol)                                                
{
	if(symbol=='*'|| symbol == '/')                                        
		return 2;
	if(symbol == '+'|| symbol == '-')                                      
		return 1;
	else
		return 0;		                                                  
}
function toexp(infix)
{
	var i,j,h,p=0,d,dec,bracket=0, item1;
	var item;
	var x,x11;
	push('(');
	i=0;
	j=0;
	item=infix[i];
	var x1,x2,term,term1; 
	while(item!=undefined)                                                        
	{
		if(item=='(')                                                          
		{
			push(item);
			bracket=i;
		}
		else if(isdigit(item)==1)                                             
		{
			if(isdigit(infix[i-1])==1 &&(top1>=0)&&(d!=-1))                  
			{
				p=0;
				d=0;
				item1=pop1();
				if(item>=0)
					push1(item1*10+(item-'0'));
				else
					push1(item1*10-(item-'0'));
			}
			else if(d!=-1)                                                
			{		
				p=0;
				d=0;
				if(infix[i-1]=='-')
				{
					x11=pop();
					push1((-1)*(item-'0'));
					if(infix[bracket+1]!='-' && infix[i-1]!='(')             // i!=(1)
						push('+');
				}
				else
					push1(item-'0');
			}
			else if(d==-1)                                        
			{
				item1=pop1();
				dec=infix[i]-'0';
				if(item1>=0)
					term1=item1+(item-'0')*Math.pow(10,p);
				else
					term1=item1-(item-'0')*Math.pow(10,p);
				push1(term1);
				p--;
			}
			j++;
		}
		else if(item=='.')
		{
			d=-1;
			p=-1;
		}		
		else if(is_operator(item)==1)                                             
		{ 
			x=pop();
			p=d=0;
			if((is_operator(x)==1) && ((precedence(x)>=precedence(item))))
			{         			
				x1=pop1();
				x2=pop1();
				switch(x)
				{
					case '*':term=x1*x2;break;
					case '/':if(x1==0)
							{
								eval1=-1;
								return 0;break;
							}
							else
							{
								term=x2/x1;break;
							}
					case '+':term=x1+x2;break;
					case '-':term=x2-x1;break;
				}
				push1(term);
				push(item);
			}
			else
			{
				push(x);                          
				push(item);
			}
		}
		else if(item== ')')                         
		{
			x=pop();  
			p=d=0;                                
			while(x!='(')
			{
				x1=pop1();
				x2=pop1();
				switch(x)
				{
					case '*':term=x1*x2;break;
					case '/':if(x1==0)
							{
								eval1=-1;
								return 0;break;
							}
							else
							{
								term=x2/x1;break;
							}
					case '+':term=x1+x2;break;
					case '-':term=x2-x1;break;
				}
				x=pop();
				push1(term);                       
			}
		}
		else
		{
			eval1=-2;
			return 0;
		}
		i++;
		item=infix[i];
	}
	while(top2>=0)                                
	{
		x=pop();                                 
		if(x!='(')
		{
			x1=pop1();
            x2=pop1();
			switch(x)                                     
			{
				case '*':term=x1*x2;break;
				case '/':if(x1==0)
							{
								eval1=-1;
								return 0;break;
							}
							else
							{
								term=x2/x1;break;
							}
				case '+':term=x1+x2;break;
				case '-':term=x2-x1;break;
			}
			push1(term);
		}
	}
	if(top2<0)
	{
		return(num[0]);
	}
}
function getinput()
{
	var expression=document.getElementById("input1").value;

var infix=[];
	var final1,start,end;
	var c='y';
	//while(c=='y'|| c=='Y')
	{
		//system("cls");
		//system("color 5F");                                                                                       
		//heading();
		//printf("enter expression in parenthesis\n");
		//printf("\nEnter the expression:");                                                                      
		//scanf(" %s",infix);
		//final=toexp(infix);   
		//infix=prompt("enter the expression,please enterA at last")	;	
		infix=expression;
		final1=toexp(infix);
		if(eval1==0)                                                                                       
		{
			console.log("\n The answer for expression "+infix+"="+final1);                                 
		}
		else if(eval1==-1)
		{
			console.log("Expression cannot be evaluated . Since division by 0 not possible\n");
		}
		else if(eval1==-2)
		{
			console.log("expression cannot be evaluated\n");
		}
		//c=prompt(" do you want to solve another expression if yes(Y or y) \n or if no(any other letter to exit): then cancel");
		//scanf(" %c",&c);
		console.log(final1);
		document.getElementById("result").innerHTML=final1;
		top2=-1;
		top1=-1;		
		eval1=0;
	}
}








