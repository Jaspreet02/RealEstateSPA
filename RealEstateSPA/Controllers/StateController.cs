using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DBHandler;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RealEstate
{
    public class StateController : BaseController<State, StateRepository>
    {
        private readonly StateRepository _stateRepository;
        public StateController(StateRepository stateRepository) : base(stateRepository)
        {
            _stateRepository = stateRepository;
        }
    }
}