

class SuccessResult {
  static make(res) {
    this.res = res;
    return this;
  }

  static send(data, type=null, total=null, ) {
    const result = {
      status: "success",
      data
    };

    if (Array.isArray(data)) {
      result.data= {
              data: data,
              total: total || 0,
            }
    }

    if(type){
      result.data = {
        [type] : data
      }
    }
    return this.res.status(200).send(result)
  }


  static sendMessage(message) {
    return this.res.status(200).send(
        {
          message: message,
        },
    );
  }


  static sendMessageData(data, message, type=null) {
    const result = {
          message: message,
          data: data,
          ...other,
        };
    if(type){
      result.data = {
        [type]: data
      }
    }
    return this.res.status(200).send(result);
  }
}

module.exports = SuccessResult;
