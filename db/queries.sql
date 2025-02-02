USE [team_16]
GO
/****** Object:  Table [dbo].[category]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [varchar](100) NULL,
	[category_iniitials] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[enquiry]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[enquiry](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[email] [varchar](100) NULL,
	[additional_info] [varchar](max) NULL,
	[phone] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[enquiry_products]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[enquiry_products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[enquiry_id] [int] NULL,
	[product_id] [int] NULL,
	[quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](100) NULL,
	[SKU] [varchar](100) NULL,
	[product_price] [int] NULL,
	[product_description] [varchar](max) NULL,
	[category_id] [int] NULL,
	[product_image] [varchar](200) NULL,
	[statusLevel] [int] NULL,
 CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[SKU] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_category]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[category_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_roles]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_roles](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [varchar](100) NULL,
	[email] [varchar](100) NULL,
	[role_id] [int] NULL,
	[password] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[products] ADD  DEFAULT ((0)) FOR [statusLevel]
GO
ALTER TABLE [dbo].[enquiry_products]  WITH CHECK ADD FOREIGN KEY([enquiry_id])
REFERENCES [dbo].[enquiry] ([id])
GO
ALTER TABLE [dbo].[enquiry_products]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([product_id])
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[user_category]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[user_category]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([role_id])
REFERENCES [dbo].[user_roles] ([role_id])
GO
/****** Object:  StoredProcedure [dbo].[insert_enquiry]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[insert_enquiry]
    @name VARCHAR(100),
    @email VARCHAR(100),
	@phone VARCHAR(100),
    @additional_info VARCHAR(MAX)
AS
BEGIN
    -- Insert the new record into the enquiry table
    INSERT INTO enquiry (name, email, additional_info , phone)
    VALUES (@name, @email, @additional_info,@phone);
    DECLARE @new_id INT
    -- Retrieve the identity value of the newly inserted record
    SET @new_id = SCOPE_IDENTITY();
    
    -- Return the new ID
    select @new_id as new_id
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_login_user]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE                 PROCEDURE [dbo].[sp_login_user]
    @email VARCHAR(100),
    @password NVARCHAR(MAX)
AS
BEGIN
    DECLARE @hashedPassword VARBINARY(MAX)
	DECLARE @count INT
    SET @hashedPassword = HashBytes('SHA2_256', @password)
            SELECT @count = COUNT(1)
            FROM dbo.users
            WHERE email = @email
                AND password = @hashedPassword 
    IF @count = 1
    BEGIN
	
        SELECT 1 as validYN,fullname,user_id,
               role_id
        FROM dbo.users
        WHERE email = @email
        AND password = @hashedPassword;
        
    END
    ELSE
    BEGIN
        SELECT 0 as validYN;
    END
END

GO
/****** Object:  StoredProcedure [dbo].[sp_register_user]    Script Date: 16-06-2024 02:20:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE    PROCEDURE [dbo].[sp_register_user]
@email VARCHAR(200) ,
@fullname VARCHAR(200),
@password NVARCHAR(MAX),
@role_id INT,
@category_id INT
AS	
BEGIN 
DECLARE @converted_password VARBINARY(MAX) = CONVERT(VARBINARY(MAX), HashBytes('SHA2_256',@password))
	INSERT INTO dbo.users
	(fullname , email , role_id , password) values 
	(@fullname , @email ,@role_id , @converted_password )

	  DECLARE @user_id INT
    SELECT @user_id = SCOPE_IDENTITY()

	INSERT INTO user_category 
	(user_id , category_id ) VALUES (@user_id , @category_id)


END
GO
